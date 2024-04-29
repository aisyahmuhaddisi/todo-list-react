import React from 'react';

const HomePage = ({
    params,
}) => (
    <div className="center">
        <h3 className="title">What's the plan for today?</h3>
        <div className="add-todo-container">
            <input type="text" id="todo" name="todo" className="todo-form" placeholder="What to do"/>
            <div className="add-todo-button">Add</div>
        </div>
        <div className="chip-container">
            <div>
                All
            </div>
        </div>
    </div>
);

export default HomePage;

