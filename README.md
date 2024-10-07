# Enigma Backend

This repository contains the backend code for the Enigma project.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/FiveD-SE/Enigma-Backend.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

-   Create a `.env` file in the root directory.
-   Add the following environment variables:

```
PAYOS_CLIENT_ID=your_payos_client_id
PAYOS_API_KEY=your_payos_api_key
PAYOS_CHECKSUM_KEY=your_payos_checksum_key
```

## Running the server

```bash
npm start
```

## API Endpoints

### Order Controller

-   `/order/create`: Creates a new order.
-   `/order/:orderId`: Retrieves an order by ID.
-   `/order/:orderId`: Updates an order by ID.
-   `/order/confirm-webhook`: Confirms a webhook URL.

### Payment Controller

-   `/payment/payos` : Handles PayOS payment webhooks.

## Usage

The backend API can be used to create, retrieve, and update orders. It also handles PayOS payment webhooks.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
