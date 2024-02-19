import { useState } from "preact/hooks"
import { copyToClipboard } from "../utils/copyToClipboard"

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
	const handleSelect = (e) => {
		setFormData((prevData) => ({
			...prevData,
			sector: e.target.selectedOptions[0].text,
			image: e.target.value,
		}))
	}

	const fullEmail = formData.email.concat("@gottig.com.ar")

	const images = {
		general: [
			"https://nube.gottig.com.ar/apps/files_sharing/publicpreview/exmaeSFHX3ddpYF?file=/&fileId=3338&x=1920&y=1081&a=true&etag=ee0c66a0fb1eb27f91420a39fa044e81",
			"/logo-general.jpg",
		],
		accesorios: [
			"https://nube.gottig.com.ar/apps/files_sharing/publicpreview/5SeZNijTjWkFLEN?file=/&fileId=3341&x=1920&y=1081&a=true&etag=758abb69ec2827fd0771706a04c6c424",
			"/logo-accesorios.jpg",
		],
		transporte: [
			"https://nube.gottig.com.ar/apps/files_sharing/publicpreview/k2AsJT8kg2cBxPR?file=/&fileId=3344&x=1920&y=1081&a=true&etag=205e605aab8f08d0cb6691758612f97a",
			"/logo-transporte.jpg",
		],
		lubricantes: [
			"https://nube.gottig.com.ar/apps/files_sharing/publicpreview/6TiqMZ2agkzYP2r?file=/&fileId=3347&x=1920&y=1081&a=true&etag=ee411656c78ece29460d6c40cf93e7e9",
			"/logo-lubricantes.jpg",
		],
		estaciones: [
			"https://nube.gottig.com.ar/apps/files_sharing/publicpreview/pwr8c9BYMqzD7t4?file=/&fileId=3335&x=1920&y=1081&a=true&etag=c64d4741636521953917882a9c406fff",
			"/logo-estaciones.jpg",
		],
	}

	const code = `<div style="font-family: andale mono,times; font-size: 12pt;"><p style="margin-bottom: 0cm;"><span style="font-size: 11.0pt; font-family: Montserrat; color: #666666; background: white;">${
		formData.name
	}</span></p><strong><span style="font-family: Montserrat; color: #434343; background: white;">${
		formData.sector
	}</span></strong>
<p style="margin-bottom: 0cm;"><span style="font-size: 11.0pt; font-family: Montserrat; color: black;"><a href="mailto:${fullEmail}"><span style="background: white;">${fullEmail}</span></a></span></p><p><span style="font-family: Montserrat; color: black;"><img src="${
		images[formData.image][0]
	}" border="0" style="margin: 16px 0;" width="200px" /></span></p><p><span style="font-size: 9.0pt; font-family: Montserrat; line-height: 1.2;">Brindamos soluciones para que nos sigas eligiendo</span><br /><span style="font-size: 9.0pt; font-family: Montserrat; color: #666666;">Seguinos en:&nbsp;</span><span style="font-size: 9.0pt; font-family: Montserrat;"><a href="https://www.instagram.com/gottigycia">Instagram</a><span style="color: #666666;">,&nbsp;</span><a href="https://www.linkedin.com/company/gottig/?viewAsMember=true">Linkedin</a><span style="color: #666666;">&nbsp;&amp;&nbsp;</span><a href="https://www.facebook.com/gottigycia">Facebook</a></span></p></div>`

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			await copyToClipboard(code)
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
						<option value="accesorios">Accesorios</option>
						<option value="estaciones">Encargado</option>
						<option value="general">Administración</option>
						<option value="general">Caja</option>
						<option value="general">Comercial</option>
						<option value="general">Compras</option>
						<option value="general">Cuentas Corrientes</option>
						<option value="general">Pagos</option>
						<option value="general">Minimercado</option>
						<option value="general">Recursos Humanos</option>
						<option value="general">Sistemas</option>
						<option value="general">Taller</option>
						<option value="lubricantes">Lubricantes</option>
						<option value="transporte">Transporte Gottig</option>
					</select>
				</div>
				<div class="">
					<button
						class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
						type="submit"
						onClick={() => copyToClipboard(code)}>
						Copiar firma
					</button>
				</div>
			</form>

			<div class="">
				<p class="font-bold p-2">Vista previa:</p>
				<div
					style="font-family: andale mono,times; font-size: 12pt;"
					class="p-4 bg-white">
					<section dangerouslySetInnerHTML={{ __html: code }}></section>
				</div>
			</div>
			<div>{message}</div>
		</div>
	)
}
export default form
