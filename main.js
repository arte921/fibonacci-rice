let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let width = canvas.width
let height = canvas.height

let gaps = 5
let sizemultiplier = 15
let blur = 3

let t = 1
let v = 0
let f = 1

let x = (width / 2 + 400) / sizemultiplier
let y = (height / 2 + 150) / sizemultiplier

let i = 0

var img = new Image()
img.crossOrigin = "Anonymous"
img.onload = main
img.src = 'https://upload.wikimedia.org/wikipedia/commons/8/80/NYC_wideangle_south_from_Top_of_the_Rock.jpg'

function draw(x,y,f){

	let xs = x * sizemultiplier
	let ys = y * sizemultiplier
	let fs = f * sizemultiplier

	for(let h = xs + gaps; h <= xs + fs - gaps; h++){
		for(let v = ys + gaps; v <= ys + fs - gaps; v++){
			let otherpx
			try{
				otherpx = canvas.getContext('2d').getImageData(h - Math.floor(blur / 2), v - Math.floor(blur / 2), blur, blur).data
			}catch{}
			

			let r = otherpx.filter((_, index) => index % 4 == 0).reduce((accumulator, value) => accumulator + value) / Math.pow(blur, 2)
			let g = otherpx.filter((_, index) => index % 4 == 1).reduce((accumulator, value) => accumulator + value) / Math.pow(blur, 2)
			let b = otherpx.filter((_, index) => index % 4 == 2).reduce((accumulator, value) => accumulator + value) / Math.pow(blur, 2)
			//let a = otherpx.filter((_, index) => index % 4 == 3).reduce((accumulator, value) => accumulator + value) / Math.pow(blur, 2)
			
			ctx.fillStyle = `rgb(${r},${g},${b})`
			ctx.fillRect(h,v,1,1)
		}
	}

	ctx.fillStyle = 'rgba(255,255,255,1)'
	ctx.filter = 'none'
	ctx.font = `${fs/3}px monospace`
	ctx.textAlign = 'center'
	ctx.fillText(f, xs + fs / 2, ys + fs / 2 + fs / 6)
}

function main(){

	ctx.drawImage(img, 0,0, canvas.width, canvas.height)	

	while(i < 10){

		draw(x,y,f)

		t = v
		v = f

		f = v + t

		switch (i % 4) {

			case 0:
				x -= f
			break

			case 1:
				y += v
			break

			case 2:
				x += v
				y -= t
			break

			case 3:
				x -= t
				y -= f
			break

		}

		i++

	}
}

