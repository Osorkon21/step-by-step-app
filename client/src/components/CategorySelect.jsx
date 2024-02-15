import { Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue } from 'react-aria-components';

export default function CategorySelect({ category, categories, handleSelectionChange, label = null }) {
  return (
    <Select placeholder={category ? category : "Goal Category"} aria-label="category select dropdown" onSelectionChange={handleSelectionChange}>
      {label && <Label>{label}</Label>}
      <Button>
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover>
        <ListBox>
          {categories?.map((category) => (
            <ListBoxItem key={category.id} id={category.name}>{category.name}</ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  )
}
