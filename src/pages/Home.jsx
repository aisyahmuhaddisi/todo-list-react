import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPencil, FaTrash } from "react-icons/fa6";
import { CircleSpinnerOverlay } from 'react-spinner-overlay';
import { toast } from 'react-toastify';
import { TODO } from '../config/services.config';

const CHIPS_TITLE = ['ALL', 'ACTIVE', 'COMPLETED']

const ChipItems = ({title, isActive, onClick, index}) => {
    return (
        <div className={`chip-items ${isActive && 'chip-items-active'}`} onClick={onClick(index)}>
            <h5>
                {title}
            </h5>
        </div>
    )
}

const HomePage = ({
    params,
}) => {
    const [activeId, setActiveId] = useState(0)
    const [title, setTitle] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [todos, setTodos] = useState([])
    const [edited, setEdited] = useState(undefined)

    const onClick = (id, status) => () => {
        if(id !== activeId) {
            setActiveId(id)
            if(status !== 'ALL') {
                getTodo(status)
            } else {
                getTodo()
            }
        }
    };

    const addTodo = async() => {
        try {
            setIsLoading(true)
            if(edited) {
                await axios.patch(TODO + '/' + edited._id, {
                    title
                })
                toast.success('Sukses mengubah data!')
            } else {
                await axios.post(TODO, {
                    title,
                    status: 'active'
                })
                toast.success('Sukses menambahkan list!')
            }

            setTitle('')
        } catch (error) {
            toast.error('Gagal menambahkan data :(')
        } finally {
            setIsLoading(false)
        }
    }

    const getTodo = async(status) => {
        try {
            const query = status ? '?status=' + status.toLowerCase() : ''
            const result = await axios.get(TODO + query)

            setTodos(result.data.data)
        } catch (error) {
            
        }
    }

    const onChangeCheckbox = async (e, id) => {
        try {
            setIsLoading(true)
            if(e.target.checked) {
                await axios.patch(TODO + '/' + id, { status: 'completed' })
            } else {
                await axios.patch(TODO + '/' + id, { status: 'active' })
            }
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }
    };

    const onDeleteTodo = (id) => async () => {
        try {
            setIsLoading(true)
            await axios.delete(TODO + '/' + id)
            
            toast.warning('Data dihapus!')
        } catch (error) {
            toast.warning('Data gagal dihapus!')
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        if(!isLoading) {
            getTodo()
        }
    }, [isLoading])

    return (
    <div className="center">
        <CircleSpinnerOverlay
            loading={isLoading} 
            overlayColor="#EDEDED"
            color="#000000"
        />

        <h3 className="title">What's the plan for today?</h3>
        <div className="add-todo-container">
            <input value={title} type="text" id="todo" name="todo" className="todo-form" placeholder="What to do" onChange={(e) => setTitle(e.target.value)}/>
            <div className="add-todo-button" onClick={addTodo}>{edited ? 'Edit' : 'Add'}</div>
        </div>
        <div className="chip-container">
            {CHIPS_TITLE.map((title, index) => {
                return <ChipItems title={title} index={index} onClick={() => onClick(index, title)} isActive={activeId === index}/>
            })}
        </div>
        <div className="todo-item-container">
            {todos.length > 0 && todos.map(({title: itemTitle, status, _id}) => {
                const isCompleted = status === 'completed';

                return (
                <div className="todo-item">
                    <div className="todo-item-left">
                        <input type="checkbox" checked={isCompleted} onChange={(e) => onChangeCheckbox(e, _id)}/>
                        <h5 className={`${isCompleted && 'text-strikethrough'}`}>{itemTitle}</h5>
                    </div>
                    <div className="todo-item-actions">
                        <FaPencil onClick={() => {
                                setEdited({title: itemTitle, _id})
                                setTitle(itemTitle)
                            }}/>
                        <FaTrash onClick={onDeleteTodo(_id)}/>
                    </div>
                </div>
            )})}
        </div>
    </div>
)};

export default HomePage;

