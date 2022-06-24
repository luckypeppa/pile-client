import NavBar from "@/components/NavBar";
import { flushPromises, mount } from "@vue/test-utils";
import authApi from "@/services/auth";

jest.mock("@/services/auth");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("NavBar", () => {
  test("If user is not logged in, do not show create and logout button.", () => {
    const $store = {
      getters: {
        isLogin: false,
      },
    };

    const wrapper = mount(NavBar, {
      global: {
        mocks: {
          $store,
        },
      },
    });
    const createBtn = wrapper.find("[data-test-id='navbar-create']");
    const logoutBtn = wrapper.find("[data-test-id='navbar-logout']");

    expect(createBtn.exists()).toBe(false);
    expect(logoutBtn.exists()).toBe(false);
  });

  test("If user is logged in, do not show register and login button.", () => {
    const $store = {
      getters: {
        isLogin: true,
      },
    };

    const wrapper = mount(NavBar, {
      global: {
        mocks: {
          $store,
        },
      },
    });

    const loginBtn = wrapper.find("[data-test-id='navbar-login']");
    const registerBtn = wrapper.find("[data-test-id='navbar-register']");

    expect(loginBtn.exists()).toBe(false);
    expect(registerBtn.exists()).toBe(false);
  });

  test("If user's role is not admin, do not show create button.", () => {
    const $store = {
      getters: {
        isLogin: true,
        isAdmin: false,
      },
    };

    const wrapper = mount(NavBar, {
      global: {
        mocks: {
          $store,
        },
      },
    });

    const createBtn = wrapper.find("[data-test-id='navbar-create']");

    expect(createBtn.exists()).toBe(false);
  });

  test("When click logout button, $store's dispatch is called.", async () => {
    const $store = {
      getters: {
        isLogin: true,
      },
      dispatch: jest.fn(),
    };

    authApi.logout.mockResolvedValueOnce({ status: 200 });

    const wrapper = mount(NavBar, {
      global: {
        mocks: {
          $store,
        },
      },
    });

    const logoutBtn = wrapper.get("[data-test-id='navbar-logout']");

    await logoutBtn.trigger("click");

    await flushPromises;

    expect(authApi.logout).toHaveBeenCalled();
    expect($store.dispatch).toHaveBeenCalled();
  });
});
