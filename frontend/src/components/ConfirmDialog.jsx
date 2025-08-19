import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function ConfirmDialog({ open, title="Are you sure?", text, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={() => onClose?.()}>
      <DialogTitle>{title}</DialogTitle>
      {text && <DialogContent><DialogContentText>{text}</DialogContentText></DialogContent>}
      <DialogActions>
        <Button onClick={() => onClose?.()}>Cancel</Button>
        <Button color="error" variant="contained" onClick={() => onConfirm?.()}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
