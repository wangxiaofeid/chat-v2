import d3 from "d3";

const chartConfig = {
    showTooltips: true,
    transitionDuration: 1000,
    innerRadius: 0,
    showLegend: false
};

export default class BaseChart {
    // Overwrite this function to apply your own removal logic
    unmount() {
        this.el.remove();
    }

    create() {
        // To be implemented by class extending BaseChart.
        // `data` is passed as an argument to this function.
    }

    update() {
        // To be implemented by class extending BaseChart.
        // `data` is passed as an argument to this function.
    }
}
