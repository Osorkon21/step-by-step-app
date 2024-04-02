import { Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue } from 'react-aria-components';

export default function CategorySelect({ category, categories, handleSelectionChange, label = null }) {
  return (
    <Select className="categorySelect" placeholder={category ? category : "Goal Category"} aria-label="category select dropdown" onSelectionChange={handleSelectionChange}>
      {label && <Label>{label}</Label>}
      <Button className="poppins p-2 border-2 border-purple hover:scale-95">
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover className="bg-middle p-4 rounded-lg hover:bg-purple hover:text-white focus:outline-none">
        <ListBox className="">
          {categories?.map((category) => (
            <ListBoxItem className="hover:bg-purple hover:text-white rounded-md p-1" key={category._id} id={category.name}>{category.name}</ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  )
}
