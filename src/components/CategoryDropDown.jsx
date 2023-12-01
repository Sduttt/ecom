import React from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { menuItems } from './data';

const CategoryDropDown = () => {


    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="light">Categories</Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Link Actions">
                {
                    menuItems.map((item) => (
                        <DropdownItem key={item.name} href={`categories${item.link}`} className='text-black'>
                            {item.name}
                        </DropdownItem>
                    ))
                }
                
            </DropdownMenu>
        </Dropdown>
    )
}

export default CategoryDropDown