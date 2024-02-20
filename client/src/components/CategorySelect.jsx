import { Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue } from 'react-aria-components';

export default function CategorySelect({ category, categories, handleSelectionChange, label = null }) {
  return (
    <Select className="" placeholder={category ? category : "Goal Category"} aria-label="category select dropdown" onSelectionChange={handleSelectionChange}>
      {label && <Label>{label}</Label>}
      <Button className="p-2">
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover className="bg-middle p-4 rounded-lg hover:bg-purple">
        <ListBox className="">
          {categories?.map((category) => (
            <ListBoxItem className="hover:bg-purple rounded-md p-1" key={category.id} id={category.name}>{category.name}</ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  )
}
