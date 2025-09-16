package resources

func GetBadRequestErrorMessage() string {
	return "Could not parse the incoming request. Please review the contents and resend."
}

func GetInternalServerErrorMessage() string {
	return "The server encountered an unhandled exception. If the problem persists, please contact support."
}

func GetNotFoundErrorMessage() string {
	return "Could not find the requested resource."
}
