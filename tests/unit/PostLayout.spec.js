import { mount } from "@vue/test-utils";
import PostLayout from "@/views/post/PostLayout";

describe("PostLayout", () => {
  test("If user's role is not admin, do not show post edit button.", async () => {
    const $store = {
      getters: {
        isLogin: true,
        isAdmin: false,
      },
    };

    const $route = {
      name: "PostEdit",
    };

    const wrapper = mount(PostLayout, {
      global: {
        mocks: {
          $store,
          $route,
        },
      },
    });

    const editButton = wrapper.find("[data-test-id='post-layout-edit']");

    expect(editButton.exists()).toBe(false);
  });
});
