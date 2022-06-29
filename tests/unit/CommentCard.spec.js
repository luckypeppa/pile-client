// import CommentCard from "@/elements/CommentCard";
// import { mount } from "@vue/test-utils";

// describe("CommentCard", () => {
//   test("If the user is not the comment author, do not show edit button.", async () => {
//     const $store = {
//       state: {
//         user: {
//           _id: "test_user",
//         },
//       },
//     };

//     const wrapper = mount(CommentCard, {
//       global: {
//         mocks: {
//           $store,
//         },
//       },
//     });

//     await wrapper.setProps({
//       comment: {
//         body: "testbody",
//         author: {
//           _id: "test_user",
//         },
//       },
//     });

//     const btn = wrapper.find('[data-test-id="edit-button"]');

//     expect(btn.exists()).toBe(false);
//   });
// });
