import App from "../../src/client/App";
import {ReactDOM} from "react-dom";
import React from "react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";


describe("application", () => {
  it("can show home page", async () => {
    const container = document.createElement("div");
    ReactDOM.render(
      <RecoilRoot>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </RecoilRoot>,
      container
    );
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h2").textContent).toEqual(
      "Start a conversation, join Convey today!"
    );
  });

  it("can navigate to profile", async () => {
    const container = document.createElement("div");
    await act(async () => {
      await ReactDOM.render(
        <RecoilRoot>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </RecoilRoot>,
        container
      );
    });
    
    const navigateToProfile = [...container.querySelectorAll("a")].find(
      (a) => a.textContent === "Profile"
    );
    await act(async () => {
      await navigateToProfile.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Profile"
    );
  });

  it("can navigate to rooms", async () => {
    const container = document.createElement("div");
    await act(async () => {
      await ReactDOM.render(
        <RecoilRoot>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </RecoilRoot>,
        container
      );
    });
    
    const navigateToRooms = [...container.querySelectorAll("a")].find(
      (a) => a.textContent === "Rooms"
    );
    await act(async () => {
      await navigateToRooms.dispatchEvent(
        new MouseEvent("click", { bubbles: true })
      );
    });
    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Available rooms"
    );
  })

  it("can navigate to signup", async () => {
    const container = document.createElement("div");
    await act(async () => {
      await ReactDOM.render(
        <RecoilRoot>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </RecoilRoot>,
        container
      );
    });
    
    const navigateToSignin = [...container.querySelectorAll("a")].find((a) => a.textContent === "Signin");
    await act(async () => { await navigateToSignin.dispatchEvent(new MouseEvent("click", { bubbles: true }))});
    
    const navigateToSignup = [...container.querySelectorAll("a")].find((a) => a.textContent === "Sing up instead");
    await act(async () => { await navigateToSignup.dispatchEvent(new MouseEvent("click", { bubbles: true }))});

    expect(container.innerHTML).toMatchSnapshot();
    expect(container.querySelector("h1").textContent).toEqual(
      "Signup to Convey"
    );
    
  })
});