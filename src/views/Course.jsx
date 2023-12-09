import "../Components.css";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal, Box } from "@mui/material";
import AddRatingModal from '../components/AddRatingModal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Course() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let { id } = useParams();
    return (
        <>
            <h1 style={{color: "white"}}>{id}</h1>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <AddRatingModal title={id}></AddRatingModal>
            </Box>
            </Modal>
        </>
    );
  }
  