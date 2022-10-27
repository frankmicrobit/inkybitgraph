let values: number[] = [] 
let max_value: number = 0

for (let i = 0; i < 24; i++){
    values.set(i, randint(0, 300))
    if (values[i] > max_value)
        max_value = values[i]
}

inkybit.init()
inkybit.clear()


// Always dra 5 lines
for (let y = 120; y > 0; y = y - 20) {
    inkybit.drawLine(15, y, 249, y, inkybit.Color.Accent)
}

// Generate the axis, based on the value set
let yAxis: number
let yAxis_interval: number

if (max_value > 500)
    yAxis_interval = 500
else if (max_value > 250)
    yAxis_interval = 100
else if (max_value > 100)
    yAxis_interval = 50
else if (max_value > 50)
    yAxis_interval = 20
else yAxis_interval = 10

//basic.showNumber(inkybit.measureText("000"))
//basic.showNumber(inkybit.measureText("100"))
//basic.showNumber(max_value)

inkybit.setPixelSize(1)

let text_start_pos: number = 0
let top_y_axis_value = yAxis_interval*5

for (let y=0; y < 6 ; y++) {
    yAxis = y * yAxis_interval
    text_start_pos = inkybit.measureText(top_y_axis_value.toString(), 1) - inkybit.measureText(yAxis.toString(), 1)

    //basic.showNumber(inkybit.measureText(yAxis.toString()))
    //pause(1000)
    inkybit.drawText(yAxis.toString(), text_start_pos, ((6-y)*20)-5, inkybit.Color.Accent, 1)
}


let color: inkybit.Color 
for (let x = 1; x < 25; x++) {
    if (values[x - 1] == max_value)
        color = inkybit.Color.Accent
    else    
        color = inkybit.Color.Black
    inkybit.drawRectangle(x * 9 + 20, 120 - (values[x-1] / yAxis_interval * 20), 6 , values[x-1], color, true)
}


inkybit.show()
basic.forever(function () {
	
})
