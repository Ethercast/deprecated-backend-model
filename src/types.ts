export enum SubscriptionStatus {
  active = 'active',
  deactivated = 'deactivated'
}

export enum SubscriptionType {
  log = 'log',
  transaction = 'transaction'
}

export enum LogFilterType {
  address = 'address',
  topic0 = 'topic0',
  topic1 = 'topic1',
  topic2 = 'topic2',
  topic3 = 'topic3'
}

export enum TransactionFilterType {
  from = 'from',
  to = 'to'
}

export type FilterOptionValue = string | string[] | null;
export type LogSubscriptionFilters = {[filterType in LogFilterType]?: FilterOptionValue};
export type TransactionSubscriptionFilters = {[filterType in TransactionFilterType]?: FilterOptionValue};

export interface Subscription {
  id: string; // uuid v4
  type: SubscriptionType;
  timestamp: number;
  secret: string;
  user: string;
  name: string; // reasonable max length
  description?: string; // reasonable max length - longer
  webhookUrl: string;
  status: SubscriptionStatus;
  subscriptionArn: string;
}

export interface LogSubscription extends Subscription {
  type: SubscriptionType.log;
  filters: LogSubscriptionFilters;
}

export interface TransactionSubscription extends Subscription {
  type: SubscriptionType.transaction;
  filters: TransactionSubscriptionFilters;
}

export interface WebhookReceiptResult {
  statusCode: number;
  success: boolean;
  error?: string;
}

export interface WebhookReceipt {
  id: string;
  subscriptionId: string;
  ttl: number;
  url: string;
  timestamp: number;
  result: WebhookReceiptResult;
}

export interface SubscriptionPostRequest extends Pick<Subscription, 'name' | 'type' | 'description' | 'webhookUrl'> {
  filters: LogSubscriptionFilters | TransactionSubscriptionFilters;
}

export interface CreateApiKeyRequest {
  scopes: Set<Scope>;
}

export interface ApiKey extends CreateApiKeyRequest {
  user: string;
  secret: string;
}

export enum Scope {
  READ_SUBSCRIPTION = 'subscription:read',
  LIST_SUBSCRIPTIONS = 'subscription:list',
  CREATE_SUBSCRIPTION = 'subscription:create',
  DEACTIVATE_SUBSCRIPTION = 'subscription:deactivate',
  CREATE_API_KEY = 'apiKey:create',
  DEACTIVATE_API_KEY = 'apiKey:deactivate'
}
