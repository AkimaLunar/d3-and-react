module.exports = {
    description: 'Generate a D3.js class.',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: `Chart name now, please!`,
        },
    ],
    actions: [
        {
            type: 'addMany',
            base: 'templates/d3-chart/',
            destination: 'src/components/{{dashCase name}}',
            templateFiles: 'templates/d3-chart/*.hbs',
        },
    ],
};
