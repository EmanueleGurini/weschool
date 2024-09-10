import Link from "next/link"

export default function StudentPage() {
	return (
		<>
		<div>SONO LA PAGINA DELLO STUDENTE</div>
		<Link href={'/account'}>Settings</Link>
		</>
	)
}