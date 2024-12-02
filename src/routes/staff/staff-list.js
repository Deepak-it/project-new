import { useNavigate } from "react-router-dom";
import { DataGrid, GridDeleteIcon, GridEditBooleanCell } from "@mui/x-data-grid";
import { apiService } from "../../app-modules/reusableComponents/services/apiService.tsx";
import { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/material/IconButton/close'
import Typography from '@mui/material/Typography';
import { Box, Button, Tooltip } from "@mui/material";
import { styled } from '@mui/material/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function StaffList() {
    const navigate = useNavigate();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedStaffId, setSelectedStaffId] = useState(null); // Store staff id to delete
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { field: 'id', headerName: "ID", flex: 1, headerClassName: 'columnHeader' },
        { field: 'username', headerName: 'Username', flex: 1, headerClassName: 'columnHeader' },
        { field: 'firstName', headerName: 'First Name', flex: 1, headerClassName: 'columnHeader' },
        { field: 'lastName', headerName: 'Last Name', flex: 1, headerClassName: 'columnHeader' },
        { field: 'email', headerName: 'Email', flex: 1, headerClassName: 'columnHeader' },
        { field: 'mobile', headerName: 'Mobile', flex: 1, headerClassName: 'columnHeader' },
        { field: 'department', headerName: 'Department', flex: 1, headerClassName: 'columnHeader' },
        { field: 'gender', headerName: 'Gender', flex: 1, headerClassName: 'columnHeader' },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            headerClassName: 'columnHeader',
            renderCell: (params) => (
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <IconButton onClick={() => handleAction(true, params.row.id)}>
                        <Tooltip arrow placement="top" title = 'Delete Staff'>
                            <img className="small-icons-grid" src='/deleteIconGrid.png'/>
                        </Tooltip>
                      </IconButton> 
                      <IconButton onClick={() => handleAction(false, params.row.id)}>
                        <Tooltip arrow placement="top" title = 'Edit Staff'>
                            <img className="small-icons-grid" src='/editIconGrid.png'/>
                        </Tooltip>
                      </IconButton>
                    </Box>
                  )
        }
    ]        

    async function getStaff() {
        try {
            const response = await apiService.getStaff();
            if (response.data.staff) {
                setRows(response.data.staff);
            }
        } catch (error) {
            console.error("Error fetching staff data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getStaff();
    }, []);

    function handleAddStaff() {
        navigate('/add/staff');
    }

    async function handleAction(isDelete, staffId, event) {
        if (event) {
            event.stopPropagation();
        }
        if (isDelete) {
            setSelectedStaffId(staffId);
            setShowDeleteDialog(true);
        } else {
            setSelectedStaffId(staffId);
            const data = {
                id: staffId
            }
            const response = await apiService.getStaffById(data)
            if(response.data.user) {
                navigate('/add/staff', {
                    state: {
                      user: response.data.user,
                      isEdit: true
                    },
                  });
            }
        }
    }

    const handleDeleteConfirm = async () => {
        if (selectedStaffId) {
            try {
                const data = {
                    staffId: selectedStaffId
                }
                const response = await apiService.deleteStaff(data)
                if(response.data.deletedCount > 0) {
                    await getStaff();
                    setShowDeleteDialog(false);
                }
            } catch (error) {
                console.error("Error deleting staff:", error);
            }
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteDialog(false);
    };

    return (
        <>
            <div>
                <div className="container-fluid">
                    <div className="container-fluid">
                        <div className="row staff-header">
                            <div className="col-lg-6 col-md-6 col-12 staff-title-container">
                                <h4 className="staff-title address-title text-grey ml-3">
                                    <span className="f-24">Staff</span>
                                </h4>
                            </div>

                            <div className="col-lg-6 col-md-6 col-12 text-right d-flex justify-content-end mt-2 mt-lg-0">
                                <button
                                    onClick={handleAddStaff}
                                    className="submitButon f-14 d-flex align-items-center ml-0"
                                >
                                    Add Staff
                                </button>
                            </div>
                        </div>

                        <div className="w-100 h-100 col-lg-12 col-md-12 col-12">
                            <DataGrid
                                loading={loading}
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                onSelectionModelChange={() => {}}
                                selectionModel={[]}
                                getRowClassName={(params) =>
                                    params.indexRelativeToCurrentPage % 2 === 0
                                      ? 'MuiDataGrid-row-even'
                                      : 'MuiDataGrid-row-odd'
                                  }
                          
                            />
                        </div>
                    </div>
                </div>
            </div>

{showDeleteDialog && (
      <BootstrapDialog
      onClose={handleDeleteCancel}
      aria-labelledby="customized-dialog-title"
      open={showDeleteDialog}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Delete Staff
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleDeleteCancel}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        {/* <CloseIcon /> */}
      </IconButton>
      <DialogContent dividers>
        <Typography gutterBottom>
          Are you sure you want to delete this staff?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" className="submitButon" autoFocus onClick={handleDeleteConfirm}>
          Save changes
        </Button>
        <Button variant="outlined"  autoFocus onClick={handleDeleteCancel}>
          Cancel
        </Button>
      </DialogActions>
    </BootstrapDialog>
)}

        </>
    );
}

export default StaffList;
