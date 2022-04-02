export const shouldNotRendered = (path) => {
    switch (path) {
        case '/login':
        case '/register':
            return true

        default: false
            break;
    }
}