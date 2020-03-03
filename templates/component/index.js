module.exports = {
    description: 'Generate a Component.',
    prompts: [
        {
            type: 'input',
            name: 'name',
            message: `Component name now, please!`,
        },
    ],
    actions: [
        {
            type: 'addMany',
            base: 'templates/component/',
            destination: 'src/components/{{dashCase name}}',
            templateFiles: 'templates/component/*.hbs',
        },
    ],
};
