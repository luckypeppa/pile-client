import PostCard from "@/components/PostCard";
import { mount } from "@vue/test-utils";

const mockPost = {
  title: "test title",
  body: "test body",
  tags: ["tag1", "tag2"],
  snippet: "test snippet",
  coverUrl: "images/123.jpg",
};

describe("PostCard", () => {
  test("When click tags, go to home page", async () => {
    const mockRouter = {
      push: jest.fn(),
    };
    const wrapper = mount(PostCard, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
      props: {
        post: mockPost,
      },
    });

    const tag = wrapper.get("[data-test-id='postcard']");

    await tag.trigger("click");

    expect(mockRouter.push).toHaveBeenCalled();
  });
});
