// JavaScript edition of barplotter
// Better version written in Python in Mu

// for (let i = 0; i < 24; i++){
// values.set(i, randint(0, 2000))
// if (values[i] > max_value)
// max_value = values[i]
// if (i == 23)
// plotGraph()
// }
let ix = 0
let top_y_axis_value = 0
let max_value: number = 0
let values: number[] = []
let text_start_pos: number = 0
let CurIX: number = 1

inkybit.init()
inkybit.clear()
inkybit.show()
radio.setGroup(100)

function plotGraph () {
    basic.showNumber(total_count)
//    return
    
    inkybit.clear()
    // Draw the lines
    for (let y = 120; y > 0; y = y - 20) {
        inkybit.drawLine(20, y, 249, y, inkybit.Color.Accent)
    }

    // Scale the y-axis
    let yAxis: number
    let yAxis_interval: number

    if (max_value < 50) {
        yAxis_interval = 10
    } else if (max_value < 75) {
        yAxis_interval = 15
    } else if (max_value < 100) {
        yAxis_interval = 20
    } else if (max_value < 150) {
        yAxis_interval = 30
    } else if (max_value < 250) {
        yAxis_interval = 50
    } else if (max_value < 500) {
        yAxis_interval = 100
    } else if (max_value < 1000) {
        yAxis_interval = 200
    } else if (max_value < 2000) {
        yAxis_interval = 400
    } else if (max_value < 5000) {
        yAxis_interval = 1000
    }

    inkybit.setPixelSize(1)
    top_y_axis_value = yAxis_interval * 5
    for (let y2 = 0; y2 <= 5; y2++) {
        yAxis = y2 * yAxis_interval
        text_start_pos = inkybit.measureText(top_y_axis_value.toString(), 1) - inkybit.measureText(yAxis.toString(), 1)
        inkybit.drawText(yAxis.toString(), text_start_pos, ((6-y2)*20)-5, inkybit.Color.Accent, 1)
    }

    // Plot the bars
    let color: inkybit.Color
    for (let x = 1; x < 49; x++) {
        if (x==CurIX)
            color = inkybit.Color.Accent
        else    
            color = inkybit.Color.Black
        inkybit.drawRectangle(x * 5 + 20, Math.round(120 - ((values[x - 1] * 20) / yAxis_interval)), 2, Math.round(((values[x - 1] * 20) / yAxis_interval)), color, true)
    }
    inkybit.show()
}

/*
radio.onReceivedValue(function (name, value) {
    if (name == "CurIX"){
        CurIX = value
    } else {
        ix = parseInt(name)
        if (ix == 0) {
            max_value = 0
        }
        values.set(ix, value)
        if (values[ix] > max_value) {
            max_value = values[ix]
        }
        if (ix == 47) {
            plotGraph()
        }
    }
})
*/

let total_count = 0
radio.onReceivedNumber(function(receivedNumber: number) {
    if (ix == 0) {
        max_value = 0
        for (let i=0; i < values.length; i++){
            values.pop()
        }
    }
    values.set(ix, receivedNumber)
    if (values[ix] > max_value) {
        max_value = values[ix]
    }
    if (ix == 47) {
        total_count++
        plotGraph()
        ix = 0
    }
    ix++
    
})



basic.forever(function () {
	
})
