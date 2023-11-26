import React from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";


const CategoryDropDown = () => {

    const menuItems = [
        {
            name: "Classic",
            link: "/classic"
        },
        {
            name: "Self Help",
            link: "/self-help"
        },
        {
            name: "Romance",
            link: "/romance"
        },
        {
            name: "Thriller/Detective",
            link: "/thriller-detective"
        },
        {
            name: "Relegious & Spiritual",
            link: "/relegious-spiritual"
        },
        {
            name: "Non Fiction",
            link: "/non-fiction"
        },
        {
            name: "Others",
            link: "/others"
        }
    ]
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