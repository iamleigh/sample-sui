import React from "react"
import "@testing-library/jest-dom"
import { screen, render, fireEvent, waitFor } from "@testing-library/react"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { Dropdown } from "../src"

const AsyncDropdown = () => {
	const perPage = 10

	return (
		<Dropdown
			menuType="select"
			isAsync={true}
			label="Async Options"
			menuSearchPlaceholder="Search..."
			onMenuSearch={() => {}}
			asyncOptions={{ perPage }}
			getOptions={async (
				search: string,
				{ page }: any,
				prevLoadedItems = [],
			) => {
				const skip = page * perPage - 10
				const items: any = []
				const baseAPI = `https://dummyjson.com/products/search`

				await fetch(
					`${baseAPI}?limit=${perPage}&skip=${skip}&total=50&q=${search}`,
				)
					.then((res) => res.json())
					.then((result) => {
						result.products.forEach((item: any) => {
							items.push({
								id: item?.id,
								label: item?.title,
								isSelected: false,
							})
						})
					})

				return {
					items,
					hasMore: [...items, ...prevLoadedItems].length < 100,
				}
			}}
		/>
	)
}

// Mock server
const server = setupServer(
	rest.get("https://dummyjson.com/products/search", (req, res, ctx) => {
		const search = req.url.searchParams.get("q")
		const products = [
			{ id: 1, title: "iPhone 13 Pro Max" },
			{ id: 2, title: "Galaxy S21 Ultra" },
			{ id: 3, title: "Pixel 6 Pro" },
		]
		const filtered = products.filter((p) =>
			search ? p.title.toLowerCase().includes(search.toLowerCase()) : true,
		)

		return res(ctx.json({ total: filtered.length, products: filtered }))
	}),
)

beforeAll(() => server.listen())
afterAll(() => server.close())
beforeEach(() => server.resetHandlers())

describe("@wpmudev/sui-dropdown - async", () => {
	it("🧱 Async dropdown renders properly", () => {
		render(<AsyncDropdown />)
		expect(screen.getByTestId("dropdown")).toBeInTheDocument()
	})

	it("📥 Loads async items after opening", async () => {
		render(<AsyncDropdown />)
		fireEvent.click(screen.getByTestId("button"))

		await waitFor(() => {
			expect(screen.getByText("iPhone 13 Pro Max")).toBeInTheDocument()
			expect(screen.getByText("Galaxy S21 Ultra")).toBeInTheDocument()
			expect(screen.getByText("Pixel 6 Pro")).toBeInTheDocument()
		})
	})

	it("🔍 Filters items on search", async () => {
		render(<AsyncDropdown />)
		fireEvent.click(screen.getByTestId("button"))

		const input = screen.getByPlaceholderText("Search...")
		fireEvent.change(input, { target: { value: "Galaxy" } })

		await waitFor(() => {
			expect(screen.getByText("Galaxy S21 Ultra")).toBeInTheDocument()
			expect(screen.queryByText("iPhone 13 Pro Max")).not.toBeInTheDocument()
			expect(screen.queryByText("Pixel 6 Pro")).not.toBeInTheDocument()
		})
	})
})
