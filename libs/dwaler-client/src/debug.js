export default function (filename) {
	return {
		debug: (...args) => console.log(filename, args.join(' '))
	}
}