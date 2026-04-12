// import { useDisclosure } from "@chakra-ui/react";
// import { StoryCardWrapper } from "../story-card";
// import CustomSortFilter, { ColorSwatchComponent, FilterCategory, SizeGridComponent, SortFilterData } from "./custom-sort-filter";
// import { useMemo } from "react";


// export default function CustomSortFilterFixture() {
//   const { isOpen: isSortFilterOpen, onToggle: onSortFilterToggle } = useDisclosure()

//   const sortFilterData = useMemo((): SortFilterData => {
//     // For size options with grid layout
//     const sizeCategory: FilterCategory = {
//       id: 'size',
//       label: 'Size',
//       options: [
//         { id: 's', label: 'S approx. 120x170', count: 1070 },
//         { id: 'm', label: 'M approx. 160x230', count: 1301 },
//       ],
//       component: SizeGridComponent
//     }

//     // For color options with swatches
//     const colorCategory: FilterCategory = {
//       id: 'colors',
//       label: 'Colors',
//       options: [
//         { id: 'beige', label: '#F5F5DC', count: 150 },
//       ],
//       component: ColorSwatchComponent
//     }

//     // For regular checkbox options (no component needed)
//     const materialCategory: FilterCategory = {
//       id: 'material',
//       label: 'Material',
//       options: [
//         { id: 'cotton', label: 'Cotton', count: 200 },
//       ]
//     }

//     return {
//       categories: [
//         {
//           id: 'status',
//           label: 'Status',
//           options: [
//             {
//               id: 'active',
//               label: 'Active',
//             },
//             {
//               id: 'inactive',
//               label: 'Inactive',
//             },
//           ],
//         },
//         {
//           ...colorCategory,
//         },
//         {
//           ...materialCategory,
//         },
//         {
//           ...sizeCategory,
//         },
//       ],
//       sortOptions: [
//         {
//           id: 'name',
//           label: 'Name',
//           value: 'name',
//         },
//         {
//           id: 'email',
//           label: 'Email',
//           value: 'email',
//         },
//         {
//           id: 'role',
//           label: 'Role',
//           value: 'role',
//         },
//         {
//           id: 'status',
//           label: 'Status',
//           value: 'status',
//         },
//         {
//           id: 'temporaryAccess',
//           label: 'Temporary Access',
//           value: 'temporaryAccess',
//         }
//       ],
//     }
//   }, [])

//   const handleApply = (filters: Record<string, string[]>, sort?: string) => {
//     console.log(filters, sort)
//     onSortFilterToggle()
//   }

//   const handleReset = () => {
//     console.log('reset')
//     onSortFilterToggle()
//   }

//   return (
//     <StoryCardWrapper title='Custom Sort Filter' description='Use to display a custom sort and filter component'>


//       <CustomSortFilter
//         isOpen={isSortFilterOpen}
//         onClose={onSortFilterToggle}
//         data={sortFilterData}
//         onApply={handleApply}
//         onReset={handleReset}
//       />
//     </StoryCardWrapper>
//   )
// }
