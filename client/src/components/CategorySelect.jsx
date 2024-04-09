import { Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue } from 'react-aria-components';
import downArrow from "../assets/icons/down-arrow.svg"


export default function CategorySelect({ category, categories, handleSelectionChange, label = null }) {
  return (
    <Select className="categorySelect flex items-center justify-center" placeholder={category ? category : "Goal Category"} aria-label="category select dropdown" onSelectionChange={handleSelectionChange}>
      {label && <Label>{label}</Label>}
      <Button className="poppins p-2 border-2 bg-white border-purple flex">
        <SelectValue />
        <img
          className="down-arrow focus:outline-none ml-2"
          src={downArrow}
          alt="caret pointing down"
          width={"24"}
          height={"24"}
        />
      </Button>
      <Popover className="bg-middle p-4 rounded-lg hover:bg-purple hover:text-white focus:outline-none">
        <ListBox className="">
          {categories?.map((category) => (
            <ListBoxItem className="hover:bg-purple hover:text-white rounded-md bg-middleblur mt-2 p-1" key={category._id} id={category.name}>{category.name}</ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  )
}
