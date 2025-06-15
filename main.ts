// JavaScript edition of barplotter
// Better version written in Python in Mu

let ix = 0
let top_y_axis_value = 0
let max_value: number = 14
let values: number[] = []
let text_start_pos: number = 0
let CurIX: number = 0
let yAxisText: string = ''
let max_count = 40
let total_count = 0

inkybit.init()
inkybit.clear()
inkybit.show()
radio.setGroup(100)

function plotGraph () {
    inkybit.clear()
    // Draw the lines
    for (let y = 120; y > 0; y = y - 40) {
        inkybit.drawLine(20, y, 249, y, inkybit.Color.Accent)
    }


    // Scale the y-axis
    let yAxis: number
    let yAxis_interval: number

    if (max_value < 15) {
        yAxis_interval = 3 
    } else if (max_value < 50) {
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
    yAxis_interval =1

    // Plot the axis (10-15v)
    inkybit.setPixelSize(1)
    top_y_axis_value = yAxis_interval * 3 + 11
    for (let y2 = 0; y2 <= 3; y2++) {
        yAxis = y2 + 11
        yAxisText = yAxis.toString() + 'v'
        text_start_pos = inkybit.measureText(top_y_axis_value.toString() + 'v', 1) - inkybit.measureText(yAxis.toString() + 'v', 1)
        inkybit.drawText(yAxis.toString() + 'v', text_start_pos, ((3-y2)*40)-5, inkybit.Color.Accent, 1)
    }


    // Plot the bars
    let color: inkybit.Color
    for (let x = 1; x < max_count; x++) {
        if (values[x - 1] < 12)
            color = inkybit.Color.Accent
        else    
            color = inkybit.Color.Black
        inkybit.drawRectangle(x * 5 + 20, Math.round(120 - (((values[x - 1] - 11) * 40) / yAxis_interval)), 2, Math.round((((values[x - 1] - 11) * 40) / yAxis_interval)), color, true)
    }
    
    inkybit.show()
}


radio.onReceivedNumber(function(receivedNumber: number) {
    if (total_count < 50) {
        total_count++
        
        if (receivedNumber >= 13) {
            basic.showLeds(`
            . # # # .
            . # # # .
            . # # # .
            . # # # .
            . # # # .
            `)
        }
        else if (receivedNumber >= 12.5) {
            basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . # # # .
            `);
        }
        else if (receivedNumber >= 12.0) {
            basic.showLeds(`
            . . . . .
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            `);
        }
        else if (receivedNumber >= 11.5) {
            basic.showLeds(`
             . . . . .
             . . . . .
             . . . . .
             . # # # .
             . # # # .
            `);
        }
        else if (receivedNumber >= 11.0) {
                basic.showLeds(`
             . . . . .
             . . . . .
             . . . . .
             . . . . .
             . # # # .
            `);
        }
        else {
            basic.showLeds(`
             . . . . .
             . # . # .
             . . # . .
             . # . # .
             . . . . .
            `);
        }

    } else {
        total_count = 0
    
    if (ix == 0) {
        //basic.showString('Nullstill', 100)
        for (let i = 0; i < max_count-1; i++) {
            values.set(i, 0)
        }
    }

    if (ix == max_count-1) {
        //basic.showString('Skift', 100)
        for (let i = 1; i < max_count+1; i++) {
            values.set(i-1, values[i])
        }
        //basic.showNumber(ix)
        values.set(ix-1, receivedNumber)
    } 
    else
    {
        //basic.showString('+', 100)
        //basic.showNumber(ix)
        values.set(ix, receivedNumber)
        ix++
    }

    plotGraph()
    basic.showNumber(receivedNumber)
 
    }
})


basic.forever(function () {
	
})