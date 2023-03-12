class TestClass 
{
    constructor() 
    {
        if (TestClass.instance) return TestClass.instance;
        TestClass.instance = this;
        this.testAnimateInput = function() 
        {
            const inputField = 
            {
                value: '',
            };
            animateInput('hello', inputField);
            setTimeout(function() { assertStrictEqual(inputField.value, 'hello', 'should animate the input field with the given text'); }, 1500);
        }
        this.testFindNearestIntervalLabelPerformance = function()
        {
            console.time('findNearestIntervalLabel');
            for (let i = 0; i < 100000; i++) Interval.findNearestIntervalLabel(Math.random() * (500 - 50) + 50 + "px");
            console.timeEnd('findNearestIntervalLabel');
        }
        this.testSetIntervalPosition = function()
        {
            const draggableCircle = 
            { 
                intervalSpot: 0,
                open: true
            };
            const newPos = 800;
            const result = setIntervalPosition(draggableCircle, newPos);
            assertOk(result[1] === "11", "The result should be 11");
            assertStrictNotEqual(result[1], "12", "The result should not be 12");
            assertNotOk(result === "NONE", "The result should not be NONE");
        }
    }
    runTests()
    {
        this.testAnimateInput();
        this.testFindNearestIntervalLabelPerformance();
        assertEqual(Interval.findNearestIntervalLabel("100px"), -7, "findNearestIntervalLabel should return -7 for position 100px");
        this.testSetIntervalPosition();
    }
}

function assertOk(value, message) 
{
    if (value) console.log(`PASS: ${message}`);
    else console.error(`FAIL: ${message}`);
}

function assertNotOk(value, message) 
{
    if (value) console.error(`FAIL: ${message}`);
}

function assertStrictNotEqual(actual, expected, message) 
{
    if (actual !== expected) console.log(`PASS: ${message}`);
    else console.error(`FAIL: ${message} - Expected ${expected}, but got ${actual}`);
}

function assertEqual(actual, expected, message) 
{
    if (actual == expected) console.log(`PASS: ${message}`);
    else console.error(`FAIL: ${message} - Expected ${expected}, but got ${actual}`);
}

function assertStrictEqual(actual, expected, message) 
{
    if (actual === expected) console.log(`PASS: ${message}`);
    else console.error(`FAIL: ${message} - Expected ${expected}, but got ${actual}`);
}