/**
 * @jest-environment jsdom
 */

import { screen, waitFor } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import mockStore from "../__mocks__/store";
import { Router } from "express";
import router from "../app/Router";
import { ROUTES, ROUTES_PATH } from "../constants/routes";

describe("Given I am connected as an employee", () => {
	describe("When I am on NewBill Page", () => {
		test("Then mail icon in vertical layout should be highlighted", async () => {
			Object.defineProperty(window, "localStorage", {
				value: localStorageMock,
			});
			window.localStorage.setItem(
				"user",
				JSON.stringify({
					type: "Employee",
				})
			);
			const root = document.createElement("div");
			root.setAttribute("id", "root");
			document.body.append(root);
			router();
			window.onNavigate(ROUTES_PATH.NewBill);
			expect(screen.getByTestId("icon-mail")).toHaveClass("active-icon");
		});
	});
	// test d'intégration POST
	describe("When I post a new bill", () => {
		test("Submit", () => {
			document.body.innerHTML = NewBillUI()
			const newBill = new NewBill({ document, onNavigate, mockStore, localStorage })

			const file = new File(["dummy content"], "Test file");
			const inputFile = screen.getByTestId("file");
			userEvent.upload(inputFile, file);
	
			expect(inputFile.files).toHaveLength(1);
			expect(inputFile.files[0]).toStrictEqual(file);

			const submitCalled = jest.fn();
			screen.getByText("Envoyer").addEventListener('click', submitCalled)
	
			screen.getByText("Envoyer").click();
			expect(submitCalled).toHaveBeenCalled();
			
		});
	})
	
});
