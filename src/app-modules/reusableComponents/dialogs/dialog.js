import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/material/IconButton/close'
import Typography from '@mui/material/Typography';
import { Button, styled, TextField } from '@mui/material';
import { useMemo } from 'react';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

const AddCommentDialog = (({ open, onClose, onConfirm, value, onChange, btn1Text, btn2Text, title }) => (
    <BootstrapDialog
        onClose={onClose}
        open={open}
        aria-labelledby="customized-dialog-title"
        fullWidth
    >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {title}
        </DialogTitle>
        <DialogContent dividers>
            <Typography gutterBottom>
                <TextField
                    type="text"
                    variant="outlined"
                    placeholder="Comment"
                    color="secondary"
                    value={value}
                    onChange={onChange}
                    fullWidth
                    required
                />
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={onConfirm}>
                {btn1Text}
            </Button>
            <Button variant="outlined" onClick={onClose}>
                {btn2Text}
            </Button>
        </DialogActions>
    </BootstrapDialog>
));

export default AddCommentDialog