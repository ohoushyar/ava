/*
 * Ava test helper
 */
var renderer,
    ctx;

avaTestHelper = function() {
    var canvas = $('#vex-canvas-test-helper')[0];

    // Init
    renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.RAPHAEL);
    ctx = renderer.getContext();

    avaTest();
    measureTest();
    containerTest();
};
