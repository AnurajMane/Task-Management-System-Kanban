import { useState, useEffect } from "react";

function EditTaskMode({isOpen, task, onClose, onUpdate}){
    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    useEffect(() => {
        if(task){
            setTitle(task.title);
            setDescription(task.description || "");
        }
    }, [task]);

    if(!isOpen) return null;
}