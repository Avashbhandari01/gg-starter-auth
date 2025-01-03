import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table1";
  import { Input } from "@/components/ui/input1"
import { LuListFilter } from "react-icons/lu";
import {  BiShow } from 'react-icons/bi';
import Link from "next/link";
import { FaEdit, FaTrash,FaPlus,FaFilter } from "react-icons/fa"; 
const truncateText = (text: string, maxLength: number): string => {
    if (!text) return "N/A";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };
interface Vproduct{
    id: string;
    name: string;
    category: string;
    quantity: number;
    Price: number;
    description: string;

}

const VirtualTable = () => {
    const products:Vproduct[] = [
        {
          id: "abc-1",
          name: "coinA",
          category: "coins",
          quantity: 20,
          Price: 500,
          description: "coin of value",
        },
        {
          id: "bcd2",
          name: "smiley",
          category: "emoji",
          quantity: 20,
          Price: 500,
          description: "express happy",
        },
       
        {
          id: "3rt",
          name: "busy",
          category: "emote",
          quantity: 20,
          Price: 500,
          description: "expression",
        },
          {
          id: "3rt",
          name: "busy",
          category: "emote",
          quantity: 20,
          Price: 500,
          description: "expression",
        },
        {
            id: "3rt",
            name: "busy",
            category: "emote",
            quantity: 20,
            Price: 500,
            description: "expression",
          },
      
      ];
  return (
    <div className="p-2 ">
        <div className="flex justify-between items-center h-[55px] px-4 bg-white my-2 mb-3 rounded">
        <div className="flex items-center py-4 w-1/4 gap-2">
            <Input type="text" placeholder="search"  />
        {/* <input type="text" placeholder="search" className="px-3 py-2 w-80 bg-slate-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 " /> */}
        <button type="button" className="flex items-center justify-center  p-2 rounded hover:bg-gray-300">
          <LuListFilter className="w-5 h-5" />
        </button>
      </div>   
      
      {/* <Link href="/dashboard">
      <button className="flex items-center gap-2 justify-end bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 active:bg-blue-700">
        <FaPlus className="w-4 h-4" /> 
        Add
      </button>
      </Link> */}
     
       </div>

    
    <Table className="w-full border-collapse border  shadow rounded  bg-white" >
        {/* <TableCaption>A list of your products in inventory.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>S.N</TableHead>
            <TableHead>Product ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price(Rs)</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product,index) => (
            <TableRow key={index}>
              <TableCell>{index+1}</TableCell>
              <TableCell>{product.id}</TableCell>
              <TableCell className="text-blue-500">{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell className="text-green-500">{product.Price.toFixed(2)}</TableCell>
              <TableCell>{truncateText(product.description, 20)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                <button
                    
                    className="text-green-500 hover:text-green-700 text-xl"
                    aria-label="view"
                  >
                    <BiShow />
                  </button>
        
                  <button
                    
                    className="text-blue-500 hover:text-blue-700 text-xl"
                    aria-label="Edit"
                  >
                    <FaEdit />
                  </button>
                
                  <button
                    
                    className="text-red-500 hover:text-red-700 text-xl"
                    aria-label="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    
    </div>
  )
}

export default VirtualTable