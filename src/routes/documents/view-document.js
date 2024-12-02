import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { apiService } from "../../app-modules/reusableComponents/services/apiService.tsx"
import { useEffect, useState } from "react";
import { Button, Card, CardActions, CardContent, CardHeader, Stack, styled, TextField, Typography } from "@mui/material";
import { Department } from "../../enums/roles.tsx";
import AddCommentDialog from "../../app-modules/reusableComponents/dialogs/dialog.js";
import moment from "moment";
import { NotificationManager } from "react-notifications";


function ViewDoc() {
    const [documentDetails, setDocumentDetails] = useState({});
    const [comments, setComments] = useState([]); // Initialize as an array
    const [documentId, setDocumentId] = useState(undefined);
    const [showAddCommentDialog, setShowAddCommentDialog] = useState(false);
    const [commentToAdd, setCommentToAdd] = useState('')
    const location = useLocation();
    const navigate = useNavigate();
    const [userState, setUser] = useState({})
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    useEffect(() => {
        if (location?.state?.docId) {
            setDocumentId(location.state.docId);
        }
    }, [location.state.docId]);

    useEffect(() => {
        if(user.username) {
            setUser(user.username)
        }
    }, [user])

    useEffect(() => {
        if (documentId) {
            const data = { id: documentId };
            apiService.getDocumentById(data).then((documentDetail) => {
                setDocumentDetails(JSON.parse(documentDetail.data.document));
            });
            apiService.getCommentsByDocumentId(data).then((response) => {
                setComments(response.data.comments);
            });
        }
    }, [documentId]);

    function handleApproveDisapproveDoc(isApprove) {
        const data = { id: documentId, isApprove };
        apiService.approveUnapproveDoc(data).then(() => {
            const data = { id: documentId };
            apiService.getDocumentById(data).then((documentDetail) => {
                setDocumentDetails(JSON.parse(documentDetail.data.document));
            });
            NotificationManager.success('Document Status updated successfully')
        });
    }

    const renderApproveDisapproveButtons = () => (
        <>
                  <div style = {{maxHeight: '170px', minHeight: '170px'}} class="ui card">
                    <Stack className="p-4 pb-2" direction="row" spacing = {1}>
                        <div >Document ID: </div> 
                        <p>{documentId}</p>
                    </Stack>
                    <Stack className="p-4 pt-2 pb-2" direction="row" spacing = {1}>
                        <div >Document Status: </div> 
                        <p>{documentDetails?.docStatus}</p>
                    </Stack>
                    <Stack className="mb-0 pt-2 p-4 pb-3" spacing={2} direction="row" >
                    {/* {isReviewed && !isApproved && ( */}
                        <Button
                            onClick={() => handleApproveDisapproveDoc(true)}
                            variant="contained"
                            type="button"
                        >
                            Mark Approved
                        </Button>
                    {/* )}  */}
                    {/* {isReviewed && isApproved && ( */}
                        <Button
                            onClick={() => handleApproveDisapproveDoc(false)}
                            variant="outlined"
                            color="primary"
                        >
                            Mark Unapproved
                        </Button>
                    </Stack>
                    </div>
                <div>
                </div>
        </>
    );

    function handleAddCancel() {
        setShowAddCommentDialog(false)
        setCommentToAdd('')
    }

    function handleAdd() {
        setShowAddCommentDialog(true)
    }

    async function handleAddConfirm() {
        const data = {
            docId: documentId,
            commentToAdd: commentToAdd,
            commentedBy: userState
        }
        const response = await apiService.addComment(data)
        if(response) {
            const data = {
                id: documentId,
            }
            apiService.getCommentsByDocumentId(data).then((response) => {
                setComments(response.data.comments);
            });
            setCommentToAdd('')
            setShowAddCommentDialog(false)
            NotificationManager.success('Comment added successfully')
        }
    }

    function handleChange(e) {
        setCommentToAdd(e.target.value)
    }

    const renderComments = (comments) => (
            <div className="col-md-12 col-lg-10 col-xl-8">
                <div className="my-3 row">
                    <div className="col-8">
                        <h4 className="text-body mb-0">Comments ({comments.length})</h4>
                    </div>
                    <div className = "col-md-4 text-right"><Button onClick = {handleAdd} variant="contained">Add Comment</Button></div>
                </div>
                {comments.map((comment, index) => (
                    <div className="card mb-3" key={index}>
                        <div className="card-body">
                            <div className="d-flex flex-start">
                                <div className="w-100">
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h6 className="text-primary fw-bold mb-0">
                                            {comment.commentedBy}
                                            <span className="text-body ms-2">{comment.comment}</span>
                                        </h6>
                                        <p className="mb-0">{moment(comment.commentedOn).format('DD-MM-YYYY [@] h:mm')}</p>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
    );

    const renderViewDoc = () => (
        <div className = "container d-flex justify-content-center">
            <div className="list-unstyled row col-md-12 col-lg-10 col-xl-8">
                <li className = "col-md-4 col-sm-6">
                    <p className="labelColor">Client</p>
                    <p className="valueColor">{documentDetails.client}</p>
                </li>
                <li className = "col-md-4 col-sm-6">
                    <p className="labelColor">Staff</p>
                    <p className="valueColor">{documentDetails.staff}</p>
                </li>
                <li className = "col-md-4 col-sm-6">
                    <p className="labelColor">Service Time</p>
                    <p className="valueColor">{documentDetails.serviceTime}</p>
                </li>
                <li className = "col-md-4 col-sm-6">
                    <p className="labelColor">Date Of Service</p>
                    <p className="valueColor">{documentDetails.dateOfService}</p>
                </li>
                <li className = "col-md-4 col-sm-6">
                    <p className="labelColor">Visit Type</p>
                    <p className="valueColor">{documentDetails.visitType}</p>
                </li>
                <li className = "col-md-4 col-sm-6">
                    <p className="labelColor">Doc Status</p>
                    <p className="valueColor">{documentDetails.docStatus}</p>
                </li>
                <li className = "col-md-4 col-sm-6">
                    <p className="labelColor">Created On</p>
                    <p className="valueColor">{documentDetails.createdAt}</p>
                </li>
            </div>
        </div>
    )

    return (
                <>
                    <div className="container-fluid">
                        {/* <div className="mt-2 container-fluid">
                            <div className="row staff-header">
                                    <div className="col-lg-6 col-md-6 col-12 staff-title-container">
                                        <h6 className="staff-title address-title text-grey ml-3">
                                            <span className="f-5">Document ID: {documentId}</span>
                                        </h6>
                                    </div>
                            </div>
                        </div> */}
                        <div className="mt-3 container-fluid">
                                <Stack spacing={2} direction={"row"} >
                                    {renderApproveDisapproveButtons(documentDetails.docStatus!=="Review", documentDetails.docStatus==="Approved")}
                                    <div className="container row d-flex justify-content-center">
                                        {renderViewDoc()}
                                        {renderComments(comments)}
                                    </div>
                                </Stack>
                        </div>
                    </div>
                    {showAddCommentDialog && (
                        <AddCommentDialog
                            open={showAddCommentDialog}
                            onClose={handleAddCancel}
                            onConfirm={handleAddConfirm}
                            value={commentToAdd}
                            onChange={handleChange}
                            title={"Add Comment"}
                            btn1Text={"Save"}
                            btn2Text={"Cancel"}
                        />
                    )}
                </>
    );
}

export default ViewDoc;
