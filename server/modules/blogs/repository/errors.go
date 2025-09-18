package repository

type DataNotFoundError struct {
	Msg string
}

func (err DataNotFoundError) Error() string {
	return err.Msg
}
