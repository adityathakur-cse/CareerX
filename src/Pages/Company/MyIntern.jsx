import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  MoreHorizontal,
  Trash2,
  Users,
  MapPin,
  Clock,
  IndianRupee,
} from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteIntern, fetchInterns } from "@/Store/Company-Slice/companySlice";
import axios from "axios";

// Mock data for internships

const MyIntern = () => {
  const { Internships, isLoading } = useSelector((state) => state.company);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInterns());
  }, []);

  const handleDelete = () => {
    if (selectedInternship) {
      dispatch(deleteIntern(selectedInternship)).then((response) => {
        if (response?.payload?.success) {
          dispatch(fetchInterns());
          setDeleteDialogOpen(false);
          toast.success("Internship deleted successfully");
          setSelectedInternship(null);
        } else {
          setDeleteDialogOpen(false);
          toast.error("Some error occurred. Please try again");
          setSelectedInternship(null);
        }
      });
    }
  };

  const openDeleteDialog = (id) => {
    setSelectedInternship(id);
    setDeleteDialogOpen(true);
  };

  const handleEdit = (id) => {
    toast.info("Edit functionality - Navigate to edit page");
    // TODO: Navigate to edit page with internship ID
  };

  const getStatusBadge = (status) => {
    return status ? (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
        Active
      </Badge>
    ) : (
      <Badge variant="secondary">Closed</Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            My Internships
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage all your posted internships
          </p>
        </div>
        <Button
          className={"cursor-pointer"}
          onClick={() => navigate("/company/post")}
        >
          Post New Internship
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">
              {Internships.length}
            </div>
            <p className="text-sm text-muted-foreground">Total Internships</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">
              {Internships.filter((i) => i.isActive === true).length}
            </div>
            <p className="text-sm text-muted-foreground">Active Internships</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">
              {Internships.reduce((acc, i) => acc + i.applications, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Applications</p>
          </CardContent>
        </Card>
      </div>

      {/* Internships Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Internships</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Stipend</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Applications</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Internships.map((internship) => (
                <TableRow key={internship._id}>
                  <TableCell className="font-medium">
                    {internship.title}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {internship.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{internship.internshipType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-4 w-4" />
                      {internship.stipend.toLocaleString()}/month
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {internship.duration} Months
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {internship.applications}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(internship.isActive)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleEdit(internship._id)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(internship._id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {Internships.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No internships posted yet.
              </p>
              <Button
                className="mt-4"
                onClick={() => (window.location.href = "/company/post")}
              >
                Post Your First Internship
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Internship</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this internship? This action
              cannot be undone. All applications for this internship will also
              be removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyIntern;
