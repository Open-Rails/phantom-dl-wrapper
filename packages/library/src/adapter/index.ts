import { connect } from '../methods/connect'
import {
  WalletName,
  WalletReadyState,
  BaseMessageSignerWalletAdapter,
  WalletAdapterNetwork
} from '@solana/wallet-adapter-base'
import { PublicKey, SendOptions, Transaction, TransactionSignature } from '@solana/web3.js'
import { EventEmitter } from 'events'

// Notes:

// wallet._handleDisconnect does nothing in our function
// connect() can reject and return 'reason' which should be an instance of WalletError
// the other methods can throw as well, and return an 'any' error type

// events emitted: 'connect', 'disconnect'

export interface PhantomCoreProviderConfig {}

export const PhantomWalletName = 'Phantom' as WalletName

export class PhantomCoreProvider extends BaseMessageSignerWalletAdapter {
  name = PhantomWalletName
  url = 'https://phantom.app'
  icon =
    'data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjM0IiB3aWR0aD0iMzQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iLjUiIHgyPSIuNSIgeTE9IjAiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1MzRiYjEiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1NTFiZjkiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYiIgeDE9Ii41IiB4Mj0iLjUiIHkxPSIwIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmIiBzdG9wLW9wYWNpdHk9Ii44MiIvPjwvbGluZWFyR3JhZGllbnQ+PGNpcmNsZSBjeD0iMTciIGN5PSIxNyIgZmlsbD0idXJsKCNhKSIgcj0iMTciLz48cGF0aCBkPSJtMjkuMTcwMiAxNy4yMDcxaC0yLjk5NjljMC02LjEwNzQtNC45NjgzLTExLjA1ODE3LTExLjA5NzUtMTEuMDU4MTctNi4wNTMyNSAwLTEwLjk3NDYzIDQuODI5NTctMTEuMDk1MDggMTAuODMyMzctLjEyNDYxIDYuMjA1IDUuNzE3NTIgMTEuNTkzMiAxMS45NDUzOCAxMS41OTMyaC43ODM0YzUuNDkwNiAwIDEyLjg0OTctNC4yODI5IDEzLjk5OTUtOS41MDEzLjIxMjMtLjk2MTktLjU1MDItMS44NjYxLTEuNTM4OC0xLjg2NjF6bS0xOC41NDc5LjI3MjFjMCAuODE2Ny0uNjcwMzggMS40ODQ3LTEuNDkwMDEgMS40ODQ3LS44MTk2NCAwLTEuNDg5OTgtLjY2ODMtMS40ODk5OC0xLjQ4NDd2LTIuNDAxOWMwLS44MTY3LjY3MDM0LTEuNDg0NyAxLjQ4OTk4LTEuNDg0Ny44MTk2MyAwIDEuNDkwMDEuNjY4IDEuNDkwMDEgMS40ODQ3em01LjE3MzggMGMwIC44MTY3LS42NzAzIDEuNDg0Ny0xLjQ4OTkgMS40ODQ3LS44MTk3IDAtMS40OS0uNjY4My0xLjQ5LTEuNDg0N3YtMi40MDE5YzAtLjgxNjcuNjcwNi0xLjQ4NDcgMS40OS0xLjQ4NDcuODE5NiAwIDEuNDg5OS42NjggMS40ODk5IDEuNDg0N3oiIGZpbGw9InVybCgjYikiLz48L3N2Zz4K'

  private _connecting: boolean
  // private _wallet: PhantomWallet | null
  private _publicKey: PublicKey | null
  private _readyState: WalletReadyState = WalletReadyState.Loadable

  isPhantom: boolean
  isConnected: boolean
  // publicKey?: { toBytes(): Uint8Array }

  constructor(config: PhantomCoreProviderConfig = {}) {
    super()
    this._connecting = false
    this._publicKey = null
    this.isPhantom = true
    this.isConnected = false
  }

  get publicKey(): PublicKey | null {
    return this._publicKey
  }

  get connecting(): boolean {
    return this._connecting
  }

  get connected(): boolean {
    return !!this.isConnected
  }

  get readyState(): WalletReadyState {
    return this._readyState
  }

  // If this is being used within the React WalletContext component, and autoConnect is on,
  // and the user has connected to this wallet before, autoConnect is quite aggressive and
  // will call this function many times. Fortunately the browser will not open pop-up windows
  // without user interaction first
  connect(): Promise<void> {
    const { app_url, dapp_encryption_public_key, redirect_link } = dappConfig
    const query = { app_url, dapp_encryption_public_key, redirect_link }
    console.log('connect() method called')
    window.open('https://google.com')
    // connect(query)
    return new Promise<void>((resolve, reject) => {
      resolve()
    })
  }

  disconnect(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      resolve()
    })
  }

  signTransaction(transaction: Transaction): Promise<Transaction> {
    return new Promise<Transaction>((resolve, reject) => {
      resolve(new Transaction())
    })
  }

  signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
    return new Promise<Transaction[]>((resolve, reject) => {
      resolve([new Transaction()])
    })
  }

  signAndSendTransaction(
    transaction: Transaction,
    options?: SendOptions
  ): Promise<{ signature: TransactionSignature }> {
    return new Promise((resolve, reject) => {
      resolve({ signature: '' })
    })
  }

  signMessage(message: Uint8Array): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
      resolve(new Uint8Array())
    })
  }

  _handleDisconnect(...args: unknown[]): unknown {
    return
  }
}

const dappConfig = {
  app_url: 'ddd',
  dapp_encryption_public_key: 'ddddee',
  redirect_link: window.location.href
}

console.log('location: ', dappConfig.redirect_link)

export interface PhantomRedirectAdapterConfig {
  network?: WalletAdapterNetwork
  appUrl?: string
  dapp_encryption_public_key?: string
  redirect_link?: string
}

export class PhantomRedirectAdapter extends PhantomCoreProvider {
  isRedirectFlow?: boolean

  constructor(config: PhantomRedirectAdapterConfig = {}) {
    super()
    if (!config.network) config.network = WalletAdapterNetwork.Mainnet
    this.isRedirectFlow = true
  }

  request(request: Object): Promise<Object> {
    return new Promise((resolve, reject) => {
      resolve({})
    })
  }
}

export default PhantomRedirectAdapter
