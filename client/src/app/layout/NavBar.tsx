import { Container, Dropdown, Menu } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

export default observer(function NavBar() {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item exact as={NavLink} to='/' header>
                    <img src="assets/favicon.png" alt="logo" style={{ marginRight: 5 }} />
                    To do list
                </Menu.Item>
                {/* <Menu.Item as={NavLink} to='/toDoList' name="toDoList" />
                <Menu.Item as={NavLink} to='/createnote' content="Create note" /> */}
            </Container>

        </Menu>
    )
})