CREATE TABLE `bookings` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`email` text NOT NULL,
	`guest_name` text NOT NULL,
	`room_id` text NOT NULL,
	`unit` integer NOT NULL,
	`check_in` text NOT NULL,
	`check_out` text NOT NULL,
	`guests` integer NOT NULL,
	`total` integer NOT NULL,
	`status` text DEFAULT 'confirmed' NOT NULL,
	`created_at` text NOT NULL,
	`request_id` text NOT NULL,
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `bookings_request_id_unique` ON `bookings` (`request_id`);--> statement-breakpoint
CREATE INDEX `bookings_user` ON `bookings` (`user_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `nights` (
	`room_id` text NOT NULL,
	`unit` integer NOT NULL,
	`night` text NOT NULL,
	`booking_id` text NOT NULL,
	PRIMARY KEY(`room_id`, `unit`, `night`),
	FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`booking_id`) REFERENCES `bookings`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `nights_booking` ON `nights` (`booking_id`);--> statement-breakpoint
CREATE TABLE `rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`name_fr` text NOT NULL,
	`name_en` text NOT NULL,
	`price` integer NOT NULL,
	`capacity` integer NOT NULL,
	`units` integer NOT NULL,
	`active` integer DEFAULT 1 NOT NULL
);
