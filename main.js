let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let width = canvas.width
let height = canvas.height

let gs = 50
let gaps = 20
let transparency = 0.6
let blur = 0

let t = 8
let v = 13
let f = 21

let x = 900
let y = 1300

let i = 2

//ctx.beginPath()

var img = new Image()
img.onload = main
img.src = https://upload.wikimedia.org/wikipedia/commons/8/80/NYC_wideangle_south_from_Top_of_the_Rock.jpg

function main(){
	ctx.drawImage(img, 0,0, canvas.width, canvas.height)

	

	while(f < width){

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

		t = v
		v = f

		i++

		ctx.fillStyle = `rgba(${gs}, ${gs}, ${gs}, ${transparency})`
		ctx.filter = `blur(${blur}px)`
		ctx.shadowBlur = blur
		ctx.shadowOffsetX = 0
		ctx.shadowOffsetY = 0
		ctx.shadowColor = `rgb(${gs}, ${gs}, ${gs}`

		ctx.fillRect(x + gaps, y + gaps, f - gaps, f - gaps)

		ctx.fillStyle = 'rgba(255,255,255,1)'
		ctx.filter = 'none'
		ctx.font = `${t/3}px monospace`
		ctx.textAlign = 'center'
		ctx.fillText(t, x + f / 2, y + f / 2 + t / 6)

	/*
		let g = i % 4

		console.log({g,x,y,f,v,t})*/

	//ctx.stroke()

	}
}

