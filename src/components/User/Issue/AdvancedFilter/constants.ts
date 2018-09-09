export default {
 assignee: [
   {
     label: 'Select issues with any assignee',
     value: '*',
   },
   {
     label: 'Select issues without assignees only',
     value: 'none',
   },
   {
     label: 'Specify assignee',
     value: 'unique',
   },
 ],
 direction: ['asc', 'desc'],
 milestone: [
   {
     label: 'Select issues with any milestone value',
     value: '*',
   },
   {
     label: 'Select issues without milestones only',
     value: 'none',
   },
   {
     label: 'Specify milestone value',
     value: 'unique',
   },
 ],
 sort: ['created', 'updated', 'comments'],
 state: ['open', 'closed', 'all'],
} as any
