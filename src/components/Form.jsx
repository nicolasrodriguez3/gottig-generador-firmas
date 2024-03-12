import { useState } from "preact/hooks"
import { copyToClipboard } from "../utils/copyToClipboard"
import { sectors } from "../data/sectors"
import { images } from "../data/images"

function form() {
	const [formData, setFormData] = useState({
		name: "Nombre y Apellido",
		email: "correo",
		sector: "Área",
		image: "general",
	})

	const [message, setMessage] = useState(null)

	const handleChange = (e) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}))
	}
	const handleSelect = ({ target }) => {
		const { selectedOptions, value } = target

		setFormData((prevData) => ({
			...prevData,
			sector: selectedOptions[0].dataset.sector,
			image: value,
		}))
	}

	const fullEmail = formData.email.concat("@gottig.com.ar")

	const codeWithRelativeImage = (img) =>
		`<div style="font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, 'sans-serif'; font-size: 10pt; background: white; box-sizing: border-box;"><p style="margin-bottom: 0cm;"><span style="font-size: 10pt; color: #666666; ">${
			formData.name
		}</span></p><strong><span style="color: #434343;">${
			formData.sector
		}</span></strong><p style="margin-bottom: 4px;"><span style="font-size: 10pt; color: black;"><a href="mailto:${fullEmail}">${fullEmail}</a></span></p><div style="padding: ${
			formData.image === "general" ? "24px 0px 8px;" : "24px 0px 4px;"
		}"><img src="${img}" border="0" width="${
			formData.image === "general" ? "110px" : "150px"
		}" /></div><p><span style="font-size: 9.0pt; line-height: 1.2;">Brindamos soluciones para que nos sigas eligiendo</span><br /><span style="font-size: 9.0pt; color: #666666;">Seguinos en:&nbsp;</span><span style="font-size: 9.0pt; "><a href="https://www.instagram.com/gottigycia">Instagram</a><span style="color: #666666;">,&nbsp;</span><a href="https://www.linkedin.com/company/gottig/?viewAsMember=true">Linkedin</a><span style="color: #666666;">&nbsp;&amp;&nbsp;</span><a href="https://www.facebook.com/gottigycia">Facebook</a></span></p></div>`

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await copyToClipboard(codeWithRelativeImage(images[formData.image][0]))
			setMessage("Se ha copiado correctamente al portapapeles.")
		} catch (error) {
			setMessage("Ocurrió un error al copiar la firma. Verifique los datos ingresados.")
		} finally {
			setTimeout(() => {
				setMessage(null)
			}, 5000)
		}
	}

	return (
		<div class="max-w-4xl mx-auto grid md:grid-cols-2 justify-center gap-x-8 gap-4">
			<form
				class="flex flex-col gap-2"
				onSubmit={handleSubmit}>
				<div>
					<label
						htmlFor="name"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Nombre y apellido
					</label>
					<input
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						type="text"
						id="name"
						name="name"
						placeholder="John Doe"
						onInput={handleChange}
						required
					/>
				</div>
				<div>
					<label
						htmlFor="email"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Email
					</label>
					<div class="flex items-center gap-1">
						<input
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="john.doe"
							required
							type="text"
							name="email"
							id="email"
							onInput={handleChange}
						/>
						<span>@gottig.com.ar</span>
					</div>
				</div>
				<div>
					<label
						htmlFor="sector"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
						Área
					</label>
					<select
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						name="sector"
						id="sector"
						onChange={handleSelect}
						required>
						<option value=""></option>
						{sectors.map(({ sector, nombre, referencia }) => (
							<option
								value={sector}
								data-sector={nombre}>
								{nombre} ({referencia})
							</option>
						))}
					</select>
				</div>
				<div class="">
					<button
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
						type="submit">
						Copiar firma
					</button>
				</div>
			</form>

			<div class="">
				<p class="font-bold p-2">Vista previa:</p>
				<div
					style="font-family: andale mono,times; font-size: 12pt;"
					class="p-4 bg-white">
					<section
						style={{ boxSizing: "content-box" }}
						dangerouslySetInnerHTML={{
							__html: codeWithRelativeImage(images[formData.image][1]),
						}}></section>
				</div>
			</div>
			<div>{message}</div>
		</div>
	)
}
export default form
