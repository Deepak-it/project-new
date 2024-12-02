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
import { Box, Button, Chip, Stack, Tooltip } from "@mui/material";
import { styled } from '@mui/material/styles';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function DocumentList() {
    const navigate = useNavigate();
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedStaffId, setSelectedStaffId] = useState(null);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isInitialDataFetched, setIsInitialDataFetched] = useState(false);

    const columns = [
        { field: 'id', headerName: "ID", flex: 1, headerClassName: 'columnHeader' },
        {
            headerName: 'View Document', 
            headerClassName: 'columnHeader',
            flex: 1,
            renderCell: (params) => (
                    <Box>
                        <Stack direction="row" spacing={1}>
                            <p onClick = {() => renderViewDoc(params.row.id)} className="text-link">View</p>
                        </Stack>
                    </Box>
                  )
        },
        { field: 'visitType', headerName: 'Visit', flex: 1, headerClassName: 'columnHeader' },
        { field: 'client', headerName: 'Client', flex: 1, headerClassName: 'columnHeader' },
        { field: 'staff', headerName: 'Staff', flex: 1, headerClassName: 'columnHeader' },
        { field: 'dateOfService', headerName: 'DOS', flex: 1, headerClassName: 'columnHeader' },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            headerClassName: 'columnHeader',
            renderCell: (params) => (
                    <Box 
                    sx={{
                        padding: '0.5em'
                      }}
                    >
                        <Stack direction="row" spacing={1}>
                            {params.row.docStatus === "Approved" && <Chip label="Approved" color="success" />}
                            {params.row.docStatus === "Rejected" && <Chip label="Unapproved" color="error" />}
                            {params.row.docStatus === "Review" && <Chip label="Review Pending" color="primary" />}
                        </Stack>
                    </Box>
                  )
        }
    ]        

    async function getDocument() {
        if(!isInitialDataFetched) {
            try {
                const response = await apiService.getDocument();
                if (response.data.documents) {
                    setRows(response.data.documents);
                    setIsInitialDataFetched(true)
                }
            } catch (error) {
                console.error("Error fetching staff data:", error);
            } finally {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        getDocument();
    }, [isInitialDataFetched]);

    function handleAddDoc() {
        navigate('/add/document');
    }

    function renderViewDoc(docId) {
        navigate('/view/document', {
                state: {
                  docId: docId,
                },
        });
    }

    const handleDeleteConfirm = async () => {
        if (selectedStaffId) {
            try {
                const data = {
                    staffId: selectedStaffId
                }
                const response = await apiService.deleteStaff(data)
                if(response.data.deletedCount > 0) {
                    setIsInitialDataFetched(false);
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
                                    <span className="f-24">Document</span>
                                </h4>
                            </div>

                            <div className="col-lg-6 col-md-6 col-12 text-right d-flex justify-content-end mt-2 mt-lg-0">
                                <button
                                    onClick={handleAddDoc}
                                    className="submitButon f-14 d-flex align-items-center ml-0"
                                >
                                    Add Document
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
                                className="cursor-undefined"
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

export default DocumentList;
