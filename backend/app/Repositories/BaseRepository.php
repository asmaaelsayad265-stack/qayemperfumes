<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

abstract class BaseRepository
{
  protected Model $model;

  public function __construct(Model $model)
  {
    $this->model = $model;
  }

  public function all(array $columns = ['*']): Collection
  {
    return $this->model->all($columns);
  }

  public function find(int $id, array $columns = ['*']): ?Model
  {
    return $this->model->find($id, $columns);
  }

  public function create(array $data): Model
  {
    return $this->model->create($data);
  }

  public function update(int $id, array $data): bool
  {
    $record = $this->find($id);
    return $record ? $record->update($data) : false;
  }

  public function delete(int $id): bool
  {
    $record = $this->find($id);
    return $record ? $record->delete() : false;
  }

  public function paginate(int $perPage = 15)
  {
    return $this->model->paginate($perPage);
  }
}