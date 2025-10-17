"use client"
import { Button } from "@/components/ui/button";
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup, FormFeedback, Card } from 'reactstrap';
import { addNewTask, completeTask, deleteTask, editTask, getTasks } from "@/url/api";
import { useEffect, useState } from "react";
import { useFormik } from 'formik';
import { object, string, number, date, boolean } from "yup";
import { toast } from "sonner";
import { CardContent } from "@/components/ui/card";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [add, setAdd] = useState(false);
  const [edit, setEdit] = useState(false);  
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState(null);
  const [ loading, setLoading ] = useState(false);
  const [task, setTask] = useState({
    title:"",
    description:""
  })

  useEffect(()=>{
    if (typeof window !== "undefined") {
    const storedUserId = localStorage.getItem("UserId");
    const storedToken = localStorage.getItem("authToken");
    setUserId(storedUserId);
    setToken(storedToken)
  }
    fetchTasks();
  },[])

  const validation = useFormik({
    enableReinitialize: true,
    initialValues:{
      title: "" || task.title,
      description: "" || task.description,
      userId:userId
    },
    validationSchema: object({
      title: string().required("First name is required"),
      description: string()
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        if(add){
          setLoading(true);
          const res = await addNewTask(values, token);

          if(!res){
            setLoading(false);
            console.log("Error adding task");
            toast.error(res.data.message,{
              richColors: true,
            });
          }
          setLoading(false);
          toast.success(res.data.message,{
            richColors: true,
          });
          toggle();
          resetForm();
          fetchTasks();
        }
        else if(edit){
          const id = task._id;
          setLoading(true)
          const res = await editTask(id, values, token);
          if(!res){
            setLoading(false);
            console.log("Error editing the task");
            toast.error(res.data.message, {
              richColors: true,
            });
          }
          setLoading(false);
          toast.success(res.data.message, {
            richColors: true,
          });
          toggle();
          resetForm();
          fetchTasks();
        }
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  })

  const editDetails = (param) => {
    setEdit(true)
    setTask(param)
  }
  
  const fetchTasks = async () => {
    try {
      const res = await getTasks(token);
      setTasks(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      setLoading(true)
      const res = await deleteTask(id, token);
      if(!res){
        setLoading(false);
        console.log("Error deleting the task");
        toast.error(res.data.message, {
          richColors: true,
        });
      }
      setLoading(false);
      toast.success(res.data.message, {
        richColors: true,
      });
      toggle();
      fetchTasks();
      
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  const handleComplete = async (id) => {
    try {
      setLoading(true)
      const res = await completeTask(id, token);
      if(!res){
        setLoading(false);
        console.log("Error deleting the task");
        toast.error(res.data.message, {
          richColors: true,
        });
      }
      setLoading(false);
      toast.success(res.data.message, {
        richColors: true,
      });
      fetchTasks();
      
    } catch (error) {
      setLoading(false);
      toast.error(error.response);
      console.log(error);
    }
  }

  const toggle = () => {
    setAdd(false)
    setEdit(false)
    setTask({
      title:"",
      description:""
    })
  }

  return (
    <>
    <div className="p-4">
      <div className="p-4 flex justify-end mb-4">
        <Button className="rounded" onClick={() => setAdd(true)}>Add Task</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tasks?.map((t) => (
            <Card key={t._id} style={{ 
              border: t.status ? "2px solid #29e076ff" : "1px solid #e5e7eb" // default gray border
            }}>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold break-words">{t.title}</h2>
                <p style={{ 
                  color: t.status ? "#29e076ff" : "1px solid #e5e7eb" // default gray border
                }}>{t.status?"Completed":"Pending"}</p>
                <p className="text-sm text-gray-600 break-words">{t.description}</p>
                <div className="mt-3 flex gap-2">
                  {!t.status && (
                    <Button size="sm" variant="default" onClick={() => handleComplete(t._id)}>Mark as Complete</Button>
                  )}
                  <Button size="sm" variant="default" onClick={() => editDetails(t)}>Edit</Button>
                  <Button size="sm" variant="default" onClick={() => handleDelete(t._id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
    </div>
      <Modal isOpen={add || edit} toggle={toggle}>
        <ModalHeader toggle={toggle}>{add?"Add Task":"Edit Task"}</ModalHeader>
        <ModalBody>
          <div className="container">  
    <Form id='contact' onSubmit={validation.handleSubmit}>
      <FormGroup>
        <Label for='title'>
          Title*:
        </Label>
        <Input
          id='title'
          name='title'
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.title}
          invalid={validation.touched.title && !!validation.errors.title}
        />
        <FormFeedback>{validation.errors.title}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for='description'>
          Description*:
        </Label>
        <Input
          id='description'
          name='description'
          type="textarea"
          rows='4'
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.description}
          invalid={validation.touched.description && !!validation.errors.description}
        />
        <FormFeedback>{validation.errors.description}</FormFeedback>
      </FormGroup>
        <Button type='submit' style={{marginTop:"10px"}}>{loading ? 'Submitting...' : 'Submit'}</Button>
      </Form>
    </div>
        </ModalBody>
      </Modal>
      </>
  )
}
