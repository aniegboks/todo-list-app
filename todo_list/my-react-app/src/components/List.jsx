// React Import
import React, { useState } from "react";

// Font Awesome Import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

// Chakra UI Imports
import { Box, chakra, Container, Heading, Text, Flex, Spacer, ListItem, UnorderedList, Checkbox, Input, FormControl, Button } from "@chakra-ui/react";

// Data Import
import { date, month } from "../data";

// Date format
const today = new Date();
const index = today.getDay();
const week = date[index];
const day = today.getDate();
const monthIndex = today.getMonth();
const currentMonth = month[monthIndex];
const year = today.getFullYear();

// Date suffix format
const dateSuffix = () => {
    if (day <= 11 && day >= 13) {
        return day + 'th';
    }
    const dateEnd = day % 10;
    let suffix;
    switch (dateEnd) {
        case 1:
            suffix = day + 'st';
            break;
        case 2:
            suffix = day + 'nd';
            break;
        case 3:
            suffix = day + 'rd';
            break;
        default:
            suffix = day + 'th';
            break;
    }
    return suffix;
};
const suffixOfDay = dateSuffix();

// Todolist function
const List = () => {
    const [tasks, setTasks] = useState('');
    const [displayTasks, setDisplayTasks] = useState([]);
    const [tasksStatus, setTasksStatus] = useState([]);

    // Handle input change
    const handleChange = (e) => {
        setTasks(e.target.value);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (tasks.trim() !== '') {
            setDisplayTasks([...displayTasks, tasks]);
            setTasks('');
        }
    };

    // Handle checkbox status change
    const handleCheckBox = (index) => {
        const updatedStatus = [...tasksStatus];
        updatedStatus[index] = !updatedStatus[index];
        setTasksStatus(updatedStatus);
    };

    // Remove a task from the list
    const removeItem = (index) => {
        const updatedTasks = [...displayTasks];
        updatedTasks.splice(index, 1);
        setDisplayTasks(updatedTasks);
        const updatedStatus = [...tasksStatus];
        updatedStatus.splice(index, 1);
        setTasksStatus(updatedStatus);
    };

    return (
        <Flex align='center' justify='center' height='100vh'>
            <Box w='100%'>
                <Container>
                    <Box className="element">
                        <Heading fontFamily='Sacramento'>{week}</Heading>
                        <Text>{suffixOfDay} {currentMonth} {year}</Text>
                        <Box className="element-wrapper">
                            <UnorderedList className="element-group">
                                {displayTasks.map((value, index) => (
                                    <ListItem listStyleType='none' className="element-list" key={index}>
                                        <Flex>
                                            <Checkbox checked={tasksStatus[index]} onChange={() => handleCheckBox(index)} id={`checkbox-${index}`} colorScheme='green'>
                                                <span className={tasksStatus[index] ? 'crossed-out' : ''}>{value}</span>
                                            </Checkbox>
                                            <Spacer />
                                            <button className="delete-item">
                                                <FontAwesomeIcon icon={faTimes} className="element-icon" onClick={() => removeItem(index)} />
                                            </button>
                                        </Flex>
                                    </ListItem>
                                ))}
                            </UnorderedList>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <Box className="element-input">
                                <FormControl>
                                    <Input placeholder='Tasks' variant='flushed' size='sm' focusBorderColor='#000' value={tasks} onChange={handleChange} />
                                </FormControl>
                            </Box>
                            <Box className="element-control">
                                <Flex>
                                    <Text className="element-counter">{displayTasks.length} tasks</Text>
                                    <Spacer />
                                    <Button className="btn" type="submit">Add</Button>
                                </Flex>
                            </Box>
                        </form>
                    </Box>
                </Container>
            </Box>
        </Flex>
    );
};

export default List;
