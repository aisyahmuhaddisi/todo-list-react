import React, { useState } from 'react';

const CHIPS_TITLE = ['ALL', 'ACTIVE', 'COMPLETE']

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
    const [activeId, setActiveId] = useState(-1)

    const onClick = (id) => () => {
        if(id !== activeId) {
            setActiveId(id)
        }
    };

    return (
    <div className="center">
        <h3 className="title">What's the plan for today?</h3>
        <div className="add-todo-container">
            <input type="text" id="todo" name="todo" className="todo-form" placeholder="What to do"/>
            <div className="add-todo-button">Add</div>
        </div>
        <div className="chip-container">
            {CHIPS_TITLE.map((title, index) => {
                return <ChipItems title={title} index={index} onClick={onClick} isActive={activeId === index}/>
            })}
        </div>
    </div>
)};

export default HomePage;

